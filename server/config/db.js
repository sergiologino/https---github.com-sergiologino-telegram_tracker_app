const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/altaMiniTrack', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        await mongoose.connect('mongodb://altauser:altauser@81.200.147.214:27017/altaMiniTrack?authSource=admin&directConnection=true', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB подключена");
    } catch (error) {
        console.error("Ошибка подключения к MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;