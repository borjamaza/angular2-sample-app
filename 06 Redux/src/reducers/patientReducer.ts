import { Reducer, Action } from 'redux';
import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors } from '../states/patientFormState';
import { INITIALIZE_PATIENT_FORM } from '../actions/patient/initializePatientFormAction';
import {  ASSIGN_PATIENT, AssignPatientAction } from '../actions/patient/assignPatientAction';
import { PATIENT_UI_INPUT, PatientUIInputAction } from '../actions/patient/updatePatientUIAction';

export const patientReducer: Reducer<PatientFormState> =
(state: PatientFormState = new PatientFormState(), action: Action): PatientFormState => {
  switch(action.type) {
    case INITIALIZE_PATIENT_FORM:
      return state;

    case ASSIGN_PATIENT:
      return assignPatient(state, action as AssignPatientAction);

    case PATIENT_UI_INPUT:
      return patientUIInput(state, action as PatientUIInputAction);

    default:
      return state;
  }
};

const initializePatientForm = (state: PatientFormState) => {
  return Object.assign({}, state, {
    patient: new Patient(),
    isValid: true,
    errors: new PatientFormErrors()
  });
}

const assignPatient = (state: PatientFormState, action: AssignPatientAction) => {
  return Object.assign({}, state, action.patient);
}

const patientUIInput = (state: PatientFormState, action: PatientUIInputAction) => {
  let patient = Object.assign({}, state.patient, {
    [action.fieldName]: action.value
  });

  return Object.assign({}, state, patient);
}
