const mongoose = require('mongoose');

let db = mongoose.createConnection('mongodb://gaini:gaini@ds119736.mlab.com:19736/dronecafe-gaini');
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let userSchema = new Schema({
    name: String,
    email: String,
    money: {
        type: Number,
        default: 100
    }
});

/* Заказано / Готовится / Доставляется / Возникли сложности / Подано */
let orderSchema = new Schema({
    clientEmail: String,
    dishId: Number,
    state: {
        type: String,
        enum: ["ordered", "cooking", "delivered", "problems", "served"]
    }
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("Connected to DB!");

});

let User = db.model("User", userSchema),
    Orders = db.model("Orders", orderSchema);


function addUser(userData) {
    return new Promise(function (resolve, reject) {

        if (userData._id === undefined) {
            let userObjects = {
                name: userData.name,
                email: userData.email.toLowerCase(),
                money: 100
            };
            User.create(userObjects, function (err, user) {
                if (user) {
                    resolve(userObjects);
                }
            });
        }
        ;

    })
}

function findUser(userData) {
    return new Promise(function (resolve, reject) {
        User.findOne({email: userData.email.toLowerCase()}, function (err, user) {
            if (user) {
                resolve(user);
            } else {
                resolve(userData);
            }
        });
    })
}

function addMoney(userData) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({email: userData.email}, {$inc: {money: 100}}, null, function (err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

function createOrder(orderData) {
    return new Promise(function (resolve, reject) {
        let dishObjects = {
            clientEmail: orderData.email,
            dishId: orderData.dishId,
            state: "ordered"
        };
        Orders.create(dishObjects, function (err, result) {
            if (err) {
                reject(cr_err);
            } else {
                resolve(result)
            }
        });
    })
}

function updateMoney(orderData, newBalance) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({email: orderData.email}, {$set: {money: newBalance}}, null, function (err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

function getClientOrderedList(orderData) {
    return new Promise(function (resolve, reject) {
        Orders.find({clientEmail: orderData.email}, function (err, dishes) {
            if (err)
                reject(err);
            if (dishes)
                resolve(dishes);

        });
    })
}

function getKitchenOrderedList() {
    return new Promise(function (resolve, reject) {
        Orders.find({state: "ordered"}, function (err, dishes) {
            if (err)
                reject(err);
            if (dishes)
                resolve(dishes);
        });
    })
}

function getKitchenCookingList() {
    return new Promise(function (resolve, reject) {
        Orders.find({state: "cooking"}, function (err, dishes) {
            if (err)
                reject(err);
            if (dishes)
                resolve(dishes);
        });
    })
}

function setChangeState(orderData, state) {
    return new Promise(function (resolve, reject) {
        Orders.findOneAndUpdate({_id: orderData._id}, {$set: { state: state }}, function (err, dish) {
            if (err)
                reject(err);
            if (dish) {
                resolve(dish);
            }
        });
    })
}

function removeOrderFromDb() {
    Orders.remove({$or:[{state: "served"},{state:"problems"}]}, function (err) {
        if (err)
            console.log(err);
    });
}

module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.addMoney = addMoney;
module.exports.createOrder = createOrder;
module.exports.updateMoney = updateMoney;
module.exports.getClientOrderedList = getClientOrderedList;
module.exports.getKitchenOrderedList = getKitchenOrderedList;
module.exports.getKitchenCookingList = getKitchenCookingList;
module.exports.setChangeState = setChangeState;
module.exports.removeOrderFromDb = removeOrderFromDb;
