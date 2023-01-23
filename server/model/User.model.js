const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'first name is required'],
            trim: true,
            text: true,
        },
        last_name: {
            type: String,
            required: [true, 'last name is required'],
            trim: true,
            text: true,
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            trim: true,
            unique: true,
            text: true,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'email is required'],
        },
        picture: {
            type: String,
            default:
                'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
        },
        cover: {
            type: String,
        },
        gender: {
            type: String,
            required: [true, 'gender is required'],
            trim: true,
        },
        bYear: {
            type: Number,
            required: true,
            trim: true,
        },
        bMonth: {
            type: Number,
            required: true,
            trim: true,
        },
        bDay: {
            type: Number,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        friends: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        requests: {
            type: Array,
            default: [],
        },
        search: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        details: {
            bio: {
                type: String,
            },
            otherName: {
                type: String,
            },
            job: {
                type: String,
            },
            workplace: {
                type: String,
            },
            highSchool: {
                type: String,
            },
            college: {
                type: String,
            },
            currentCity: {
                type: String,
            },
            relationship: {
                type: String,
                enum: ['Single', 'In a relationship', 'Married'],
            },
            instagram: {
                type: String,
            },
        },
        savedPost: [
            {
                post: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Post',
                },
                savedAt: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
    },
    { timestamps: true },
);
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
