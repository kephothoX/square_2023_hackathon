"use strict";
exports.__esModule = true;
exports.getSquareSubscriptionByID = exports.resumeSquareSubscription = exports.cancelSquareSubscription = exports.pauseSquareSubscription = exports.updateSquareLocation = exports.getSquareSubscriptions = exports.deleteSquareUser = exports.updateSquareUser = exports.getSquareUser = exports.getSquareUsers = exports.newSquarePayment = exports.payment = exports.getSquareInvoices = exports.newSquareInvoice = exports.newSquareOrder = exports.disableSquareCard = exports.getSquareCard = exports.getSquareCards = exports.newSquareCard = exports.newSquareSubscription = exports.newSquareOnlineSubscriptionCheckout = exports.getSquareCatalogObjectByID = exports.getSquareCustomerByEmail = exports.getSquareMainLocation = exports.newSquareCustomer = exports.editSquareLocation = exports.getSquareLocation = exports.newSquareLocation = exports.newSquareCatalog = exports.getSquareCatalog = exports.getSquareLocations = exports.getSquareMerchants = void 0;
var functions = require("firebase-functions");
var admin = require("firebase-admin");
var cors = require("cors");
var axios_1 = require("axios");
var Auth = 'Bearer Access Token';
admin.initializeApp();
exports.getSquareMerchants = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/merchants',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareLocations = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/locations',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareCatalog = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/catalog/list',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareCatalog = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/catalog/object/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareLocation = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/location/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareLocation = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/locations/" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.editSquareLocation = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/location/" + request.body.id,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareCustomer = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/customers/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareMainLocation = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/locations/main',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareCustomerByEmail = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/customers/search/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareCatalogObjectByID = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/catalog/object/" + request.body.id + "?include_related_objects=true",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareOnlineSubscriptionCheckout = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareSubscription = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/subscriptions/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareCard = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/cards',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareCards = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/cards?customer_id=" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareCard = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/cards/" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.disableSquareCard = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/cards/" + request.body.id + "/disable/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareOrder = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/orders/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquareInvoice = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/invoices/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareInvoices = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/invoices?location_id=" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.payment = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/payments/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.newSquarePayment = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/payments/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareUsers = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/customers?sort_field=CREATED_AT&sort_order=DESC',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareUser = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/customers/" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.updateSquareUser = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/customers/" + request.body.id,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.deleteSquareUser = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/customers/" + request.body.id,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareSubscriptions = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: 'https://connect.squareupsandbox.com/v2/invoices/search/',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.updateSquareLocation = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/locations/" + request.body.id,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body.data
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.pauseSquareSubscription = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/subscriptions/" + request.body.subscription_id + "/pause/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body.dataSet
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.cancelSquareSubscription = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/subscriptions/" + request.body.subscription_id + "/cancel/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body.dataSet
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.resumeSquareSubscription = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/subscriptions/" + request.body.subscription_id + "/resume/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            },
            data: request.body.data
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
exports.getSquareSubscriptionByID = functions.https.onRequest(function (request, response) {
    cors({
        origin: '*'
    })(request, response, function () {
        functions.logger.info("Square API Logs...", { structuredData: true });
        axios_1["default"]({
            url: "https://connect.squareupsandbox.com/v2/subscriptions/" + request.body.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Auth
            }
        }).then(function (axiosResponse) {
            var res = JSON.stringify(axiosResponse.data);
            response.status(200).send(res);
        });
    });
});
