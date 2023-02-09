const { User } = require("../models");
const {AuthenticationError} = require ("apollo-server-express")
const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    async createUser(parent, args) {
      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },
    async login(parent, args) {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        throw new AuthenticationError("Invalid Creditials");
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid Creditials");
      }
      const token = signToken(user);
      return { token, user };
    },
    async saveBook(parent, args, context) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("You need to be logged in");
      }
    },
    async deleteBook(parent, args, content) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
     throw new AuthenticationError("You need to be logged in");
      }
      return (updatedUser);
    },
  },
};

module.exports = resolvers;
