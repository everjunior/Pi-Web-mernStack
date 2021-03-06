import axios from "axios";
import { setAlert } from "./alert";
import * as firebase from 'firebase'
import {
  GET_GROUP,
  GROUP_ERROR,
  DELETE_GROUP,
  GET_GROUP_DETAILS,
  
  GET_USERS,
  GET_VOTE_PROG,
  GET_PROFILE
} from "./types";

import { messaging } from "../init-fcm";
export const getallgroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group/all");
    console.log("response object", res);
    console.log("response data", res.data);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getactivatedgroup = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group/activatedGroup");
    console.log("response object", res);
    console.log("response data", res.data);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getallgroupslimit = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group/alllimit");
    console.log("response object", res);
    console.log("response data", res.data);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getgroup = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.get(`/api/group/details/${id}`);
    console.log(id);
    console.log("response object", res);
    console.log("response data", res.data);
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getvoteprog = (id, idVR) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.get(`/api/group/voteProg/${id}/${idVR}`);
    console.log(id);
    console.log("response object", res);
    console.log("response data", res.data);
    console.log("nbno", res.data.nbno);
    dispatch({
      type: GET_VOTE_PROG,
      payload: res.data,
    });
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addGroup = (FormData, history, edit = false, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(FormData);
    const res = await axios.post(`/api/group/${id}`, FormData, config);
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(setAlert(edit ? "Group Updated" : "Group created", "success"));
    
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const editGroup = (FormData, history, edit = false, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/group/${id}`, FormData, config);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Project Updated" : "Project created", "success"));
    if (!edit) {
      history.push("/all-groups");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletegroup = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.delete(`/api/group/${id}`);
    console.log(id);
    console.log("response object", res);
    console.log("response data", res.data);
    dispatch({
      type: DELETE_GROUP,
      payload: res.data,
    });
    dispatch(setAlert("Project Removed", "success"));
  } catch (error) {
    console.log("err response", error);
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const sendRequest = (id) => async (dispatch) => {

 const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const token = await messaging.getToken();

const FormData={
  registrationToken:token,
  message:"request Send"
}

try {

    const res = await axios.put(`/api/group/request/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
    await axios.post('/firebase/notification',FormData,config)
    dispatch(setAlert("Request send"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const AcceptInvitation = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { etat: true };

    const res = await axios.put(`/api/group/accpterInv/${id}`, data, config);
    console.log("inv accep");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Invitation Accepted", "success"));
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const DelteInvitation = (id) => async (dispatch) => {
  try {
    const data = { etat: false };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/group/accpterInv/${id}`, data, config);
    console.log("inv delet");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    dispatch(setAlert("Invitation Deleted", "danger"));
  } catch (error) {
    dispatch({
      type: GET_USERS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const AcceptRequest = (idG, idI) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { etat: true };

    const res = await axios.put(
      `/api/group/accpterReq/${idG}/${idI}`,
      data,
      config
    );
    console.log("req accep");
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    dispatch(setAlert("Request Accepted", "success"));
  } catch (error) {
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const DelteRequest = (idG, idI) => async (dispatch) => {
  try {
    const data = { etat: false };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/group/accpterReq/${idG}/${idI}`,
      data,
      config
    );
    console.log("req delet");
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    dispatch(setAlert("Request Deleted", "danger"));
  } catch (error) {
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const submitVote = (value, idG, idR) => async (dispatch) => {
  try {
    const data = { response: value };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/group/vote/${idG}/${idR}`, data, config);
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    dispatch(setAlert("Vote send"));
  } catch (error) {
    //   dispatch({
    //       type: GROUP_ERROR,
    //       payload: {msg:error.response.statusText, status: error.response.status }
    //   });
  }
};
export const submitVoteMultipte = (value, idG, idR) => async (dispatch) => {
  try {
    const data = { response: value };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/group/votemultiple/${idG}/${idR}`,
      data,
      config
    );
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    dispatch(setAlert("Vote send"));
  } catch (error) {
    //   dispatch({
    //       type: GROUP_ERROR,
    //       payload: {msg:error.response.statusText, status: error.response.status }
    //   });
  }
};
export const assignLeader = (idg, ids) => async (dispatch) => {
  try {
    

    const res = await axios.put(`/api/group/assignleader/${idg}/${ids}`);
    console.log("groupleadr valide");
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
  } catch (error) { 
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const SendVoteRequest = (idG, FormData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/api/group/voteReq/${idG}`, FormData, config);
    console.log("req accep");
    dispatch({
      type: GET_GROUP_DETAILS,
      payload: res.data,
    });
    dispatch(setAlert("Request Accepted", "success"));
  } catch (error) {
    dispatch({
      type: GET_GROUP,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const ValidateGroup = (id, value) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { etat: value };

    const res = await axios.put(`/api/group/validate/${id}`, data, config);
    console.log("group valide");
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
