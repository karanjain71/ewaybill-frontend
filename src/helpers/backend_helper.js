import * as url from "./url_helper";
import axiosApi from "./api_helper";
import store from "./../store/index";

export const postLogin = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };
  return axiosApi
    .post(url.POST_LOGIN, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "LoggedIn successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while login, please check credentials",
        color: "red",
      });
      console.log(err);
    });
};

export const postGoogleLogin = async (email) => {
  const payload = {
    email: email,
  };
  return axiosApi
    .post(url.POST_GOOGLE_LOGIN, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "LoggedIn successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while google login, please try again",
        color: "red",
      });
      console.log(err);
    });
};

export const postRegister = async (payload) => {
  //it is not working when the api is failing
  return axiosApi
    .post(url.POST_REGISTER, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "User registered successfully. Please login to continue",
          color: "green",
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const postForgotPassword = async (payload) => {
  return axiosApi
    .post(url.POST_FORGOT_PASSWORD, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: response.data.msg,
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      console.log(err);
    });
};

export const postCreateEwaybill = async (payload) => {
  return axiosApi
    .post(url.POST_CREATE_EWAYBILL, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "Ewaybill Added Successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while adding ewaybill. Please retry",
        color: "red",
      });
      console.log(err);
    });
};

export const postCreateEwaybillPdf = async (payload) => {
  return axiosApi
    .post(
      url.POST_CREATE_EWAYBILL_PDF,
      {
        file: payload,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        addToken: true,
      }
    )
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "Ewaybill Added Successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while uploading ewaybill. Please retry",
        color: "red",
      });
      console.log(err);
    });
};

export const getAllEwaybills = async () => {
  return axiosApi
    .get(url.GET_ALL_EWAYBILLS, { addToken: true })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while fetching ewaybills",
        color: "red",
      });
      console.log(err);
    });
};

export const getArchivedEwaybills = async () => {
  return axiosApi
    .get(url.GET_ARCHIVED_EWAYBILLS, { addToken: true })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error while fetching ewaybills",
        color: "red",
      });
      console.log(err);
    });
};

export const updateEwaybill = async (payload) => {
  return axiosApi
    .put(url.UPDATE_EWAYBILL + `/${payload.id}`, payload, { addToken: true })
    .then((response) => {
      console.log(response + " is the respone");
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "Ewaybill Updated Successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Error in updating ewaybill. Please retry",
        color: "red",
      });
      console.log(err);
    });
};

export const deleteEwaybillItem = async (id) => {
  return axiosApi
    .delete(url.DELETE_EWAYBILL + `/${id}`, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "Ewaybill Deleted Successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Unable to delete ewaybill",
        color: "red",
      });
      console.log(err);
    });
};

export const getUserDetails = async () => {
  return axiosApi
    .get(url.GET_USER, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Unable to fetch user profile",
        color: "red",
      });
      console.log(err);
    });
};
export const updateUserDetails = async (payload) => {
  return axiosApi
    .put(url.UPDATE_USER, payload, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Unable to update user profile",
        color: "red",
      });
      console.log(err);
    });
};

export const updateEmailTiming = async (payload) => {
  console.log(payload);
  return axiosApi
    .put(url.UPDATE_EMAIL_TIMING, payload, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: "Unable to update email timing for the day",
        color: "red",
      });
      console.log(err);
    });
};

export const resetUserPassword = async (payload) => {
  return axiosApi
    .post(url.RESET_PASSWORD, payload, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: response.data.msg,
          color: "green",
        });
        return response.data.success;
      }
      throw response.data.success;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const resetUserPasswordLink = async (payload) => {
  return axiosApi
    .post(url.RESET_PASSWORD_LINK, payload, { addToken: false })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: response.data.msg,
          color: "green",
        });
        return response.data.success;
      }
      throw response.data.success;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const postWelcomePageDetails = async (payload) => {
  return axiosApi
    .post(url.USER_WELCOME_DETAILS, payload, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: response.data.msg,
          color: "green",
        });
        return response.data.success;
      }
      throw response.data.success;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const createOrderId = async (amount) => {
  return axiosApi
    .get(url.GET_RAZORPAY_ORDER_ID + `/${amount}`, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log("getting order id with", response);
        return response.data;
      }
      throw response.data.success;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const createOrder = async (payload) => {
  return axiosApi
    .post(url.POST_RAZORPAY_CREATE_ORDER, payload, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        store.dispatch("notifications/setNotificationsList", {
          text: "Payment recorded successfully",
          color: "green",
        });
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

export const getMyTransactions = async () => {
  return axiosApi
    .get(url.GET_RAZORPAY_PAYMENTS, { addToken: true })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
      throw response.data;
    })
    .catch((err) => {
      store.dispatch("notifications/setNotificationsList", {
        text: err.response.data.msg,
        color: "red",
      });
      return err.response.data.success;
    });
};

