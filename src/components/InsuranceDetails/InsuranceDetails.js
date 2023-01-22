import React from "react";
import "./InsuranceDetails.css";

const InsuranceDetails = (props) => {
  return (
    <>
      <ul>
        <li>Package Name: {props.insurance.name}</li>
        <li>
          Price:{" "}
          {props.buyData
            ? props.buyData.premium.toLocaleString("en-US")
            : props.insuredInsurances.premium.toLocaleString("en-US")}{" "}
          THB
        </li>
        <li>Details:</li>
        <ol>
          <li>
            Covid Protection:{" "}
            {props.buyData
              ? props.buyData.covidProtect
                ? "Included"
                : "Not Included"
              : props.insuredInsurances.covidProtect
              ? "Included"
              : "Not Included"}
          </li>
          <li>In-patient (IPD) medical expenses per year</li>
          <ul>
            {props.insurance.maxMedExpensePerYear && (
              <li>
                Maximum expenses per year:{" "}
                {props.insurance.maxMedExpensePerYear.toLocaleString("en-US")}{" "}
                THB
              </li>
            )}
            {props.insurance.maxMedExpensePerTime && (
              <li>
                Normal patient room expense:{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            )}
            {props.insurance.normalPatientRoomExpense === 0 ? (
              <li>
                Normal patient room expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.normalPatientRoomExpense && (
                <li>
                  Normal patient room expense:{" "}
                  {props.insurance.normalPatientRoomExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </li>
              )
            )}
            {props.insurance.icuCcuPatientRoomExpense === 0 ? (
              <li>
                ICU/ICC patient room expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.icuCcuPatientRoomExpense && (
                <li>
                  ICU/ICC patient room expense:{" "}
                  {props.insurance.icuCcuPatientRoomExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </li>
              )
            )}
            {props.insurance.genMedExpense === 0 ? (
              <li>
                General medical expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.genMedExpense && (
                <li>
                  General medical expense:{" "}
                  {props.insurance.genMedExpense.toLocaleString("en-US")} THB
                </li>
              )
            )}
            {props.insurance.emergencyMedExpense === 0 ? (
              <li>
                Emergency medical expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.emergencyMedExpense && (
                <li>
                  Emergency medical expense:{" "}
                  {props.insurance.emergencyMedExpense.toLocaleString("en-US")}{" "}
                  THB
                </li>
              )
            )}
            {props.insurance.crfExpense === 0 ? (
              <li>
                Chronic renal failure (CRF) expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.crfExpense && (
                <li>
                  Chronic renal failure (CRF) expense:{" "}
                  {props.insurance.crfExpense.toLocaleString("en-US")} THB
                </li>
              )
            )}
            {props.insurance.cancerExpense === 0 ? (
              <li>
                Cancer expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.cancerExpense && (
                <li>
                  Cancer expense:{" "}
                  {props.insurance.cancerExpense.toLocaleString("en-US")} THB
                </li>
              )
            )}
            {props.insurance.ambulanceExpense === 0 ? (
              <li>
                Ambulance expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.ambulanceExpense && (
                <li>
                  Ambulance expense:{" "}
                  {props.insurance.ambulanceExpense.toLocaleString("en-US")} THB
                </li>
              )
            )}
            {props.insurance.normalPatientIncomeCompensateExpense === 0 ? (
              <li>
                Normal patient income compensate: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.normalPatientIncomeCompensateExpense && (
                <li>
                  Normal patient income compensate:{" "}
                  {props.insurance.normalPatientIncomeCompensateExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </li>
              )
            )}
            {props.insurance.icuCcuPatientIncomeCompensateExpense === 0 ? (
              <li>
                ICU/ICC patient income compensate: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.icuCcuPatientIncomeCompensateExpense && (
                <li>
                  ICU/ICC patient income compensate:{" "}
                  {props.insurance.icuCcuPatientIncomeCompensateExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </li>
              )
            )}
            {props.insurance.surgicalTreatmentExpense === 0 ? (
              <li>
                Surgical treatment expense: Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </li>
            ) : (
              props.insurance.surgicalTreatmentExpense && (
                <li>
                  Surgical treatment expense:{" "}
                  {props.insurance.surgicalTreatmentExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </li>
              )
            )}
          </ul>
          {props.insurance.opdExpense === 0 ? (
            <li>
              Out-patient (OPD) medical expense: Actual pay, not exceed{" "}
              {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")} THB
            </li>
          ) : (
            props.insurance.opdExpense && (
              <li>
                Out-patient (OPD) medical expense:{" "}
                {props.insurance.opdExpense.toLocaleString("en-US")} THB
              </li>
            )
          )}
          {props.insurance.deathOrPermanentDisabilityExpense === 0 ? (
            <li>
              Death or permanent disability compensate: Actual pay, not exceed{" "}
              {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")} THB
            </li>
          ) : (
            props.insurance.deathOrPermanentDisabilityExpense && (
              <li>
                Death or permanent disability compensate:{" "}
                {props.insurance.deathOrPermanentDisabilityExpense.toLocaleString(
                  "en-US"
                )}{" "}
                THB
              </li>
            )
          )}
          {props.insurance.healthCheckOrVaccineExpense === 0 ? (
            <li>
              Health checking or vaccine expense: Actual pay, not exceed{" "}
              {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")} THB
            </li>
          ) : (
            props.insurance.healthCheckOrVaccineExpense && (
              <li>
                Health checking or vaccine expense:{" "}
                {props.insurance.healthCheckOrVaccineExpense.toLocaleString(
                  "en-US"
                )}{" "}
                THB
              </li>
            )
          )}
          {props.insurance.dentistExpense === 0 ? (
            <li>
              Dentist expense: Actual pay, not exceed{" "}
              {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")} THB
            </li>
          ) : (
            props.insurance.dentistExpense && (
              <li>
                Dentist expense:{" "}
                {props.insurance.dentistExpense.toLocaleString("en-US")} THB
              </li>
            )
          )}
        </ol>
      </ul>
    </>
  );
};

export default InsuranceDetails;
