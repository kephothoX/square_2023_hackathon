import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import axios from "axios";

const Auth: string = 'Bearer Access Token';

admin.initializeApp();
export const getSquareMerchants = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/merchants',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareLocations = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/locations',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCatalog = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/catalog/list',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCatalog = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/catalog/object/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/location/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/locations/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const editSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/location/${ request.body.id }`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCustomer = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareMainLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/locations/main',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareCustomerByEmail = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers/search/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCatalogObjectByID = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Square API Logs...", {structuredData: true});


    axios({
      url: `https://connect.squareupsandbox.com/v2/catalog/object/${ request.body.id }?include_related_objects=true`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const newSquareOnlineSubscriptionCheckout = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    })
  });
});

export const newSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/subscriptions/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/cards',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCards = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards?customer_id=${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const disableSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards/${ request.body.id }/disable/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});



export const newSquareOrder = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/orders/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareInvoice = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/invoices/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareInvoices = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/invoices?location_id=${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      }

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const payment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/payments/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquarePayment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/payments/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareUsers = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers?sort_field=CREATED_AT&sort_order=DESC',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const updateSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const deleteSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      }
    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareSubscriptions = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/invoices/search/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const updateSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/locations/${ request.body.id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.data,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const pauseSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id}/pause/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.dataSet,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const cancelSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id }/cancel/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.dataSet,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const resumeSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id }/resume/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.data,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareSubscriptionByID = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


