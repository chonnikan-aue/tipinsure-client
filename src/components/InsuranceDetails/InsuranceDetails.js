import React from "react";
import "./InsuranceDetails.css";

const InsuranceDetails = (props) => {
  return (
    <>
      <ul>
        <li>
          Package Name: <span className="insurance-detail">{props.insurance.name}</span>{" "}
        </li>
        <li>
          Price:{" "}
          <span className="insurance-detail">
            {props.buyData
              ? props.buyData.premium.toLocaleString("en-US")
              : props.insuredInsurances.premium.toLocaleString("en-US")}{" "}
            THB
          </span>{" "}
        </li>
        <li>Details:</li>
        <ol>
          <li>
            Covid Protection:{" "}
            <span className="insurance-detail">
              {props.buyData
                ? props.buyData.covidProtect
                  ? "Included"
                  : "Not Included"
                : props.insuredInsurances.covidProtect
                ? "Included"
                : "Not Included"}
            </span>{" "}
          </li>
          <li>In-patient (IPD) medical expenses per year</li>
          <ul>
            {props.insurance.maxMedExpensePerYear && (
              <li>
                Maximum expenses per year:{" "}
                <span className="insurance-detail">
                  {props.insurance.maxMedExpensePerYear.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            )}
            {props.insurance.maxMedExpensePerTime && (
              <li>
                Maximum expenses per disease or per accident:{" "}
                <span className="insurance-detail">
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            )}
            {props.insurance.normalPatientRoomExpense === 0 ? (
              <li>
                Normal patient room expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.normalPatientRoomExpense && (
                <li>
                  Normal patient room expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.normalPatientRoomExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.icuCcuPatientRoomExpense === 0 ? (
              <li>
                ICU/ICC patient room expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.icuCcuPatientRoomExpense && (
                <li>
                  ICU/ICC patient room expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.icuCcuPatientRoomExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.genMedExpense === 0 ? (
              <li>
                General medical expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.genMedExpense && (
                <li>
                  General medical expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.genMedExpense.toLocaleString("en-US")} THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.emergencyMedExpense === 0 ? (
              <li>
                Emergency medical expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.emergencyMedExpense && (
                <li>
                  Emergency medical expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.emergencyMedExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.crfExpense === 0 ? (
              <li>
                Chronic renal failure (CRF) expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.crfExpense && (
                <li>
                  Chronic renal failure (CRF) expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.crfExpense.toLocaleString("en-US")} THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.cancerExpense === 0 ? (
              <li>
                Cancer expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.cancerExpense && (
                <li>
                  Cancer expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.cancerExpense.toLocaleString("en-US")} THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.ambulanceExpense === 0 ? (
              <li>
                Ambulance expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.ambulanceExpense && (
                <li>
                  Ambulance expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.ambulanceExpense.toLocaleString("en-US")}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.normalPatientIncomeCompensateExpense === 0 ? (
              <li>
                Normal patient income compensate:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.normalPatientIncomeCompensateExpense && (
                <li>
                  Normal patient income compensate:{" "}
                  <span className="insurance-detail">
                    {props.insurance.normalPatientIncomeCompensateExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.icuCcuPatientIncomeCompensateExpense === 0 ? (
              <li>
                ICU/ICC patient income compensate:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.icuCcuPatientIncomeCompensateExpense && (
                <li>
                  ICU/ICC patient income compensate:{" "}
                  <span className="insurance-detail">
                    {props.insurance.icuCcuPatientIncomeCompensateExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
            {props.insurance.surgicalTreatmentExpense === 0 ? (
              <li>
                Surgical treatment expense:{" "}
                <span className="insurance-detail">
                  Actual pay, not exceed{" "}
                  {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                  THB
                </span>{" "}
              </li>
            ) : (
              props.insurance.surgicalTreatmentExpense && (
                <li>
                  Surgical treatment expense:{" "}
                  <span className="insurance-detail">
                    {props.insurance.surgicalTreatmentExpense.toLocaleString(
                      "en-US"
                    )}{" "}
                    THB
                  </span>{" "}
                </li>
              )
            )}
          </ul>
          {props.insurance.opdExpense === 0 ? (
            <li>
              Out-patient (OPD) medical expense:{" "}
              <span className="insurance-detail">
                Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </span>{" "}
            </li>
          ) : (
            props.insurance.opdExpense && (
              <li>
                Out-patient (OPD) medical expense:{" "}
                <span className="insurance-detail">
                  {props.insurance.opdExpense.toLocaleString("en-US")} THB
                </span>{" "}
              </li>
            )
          )}
          {props.insurance.deathOrPermanentDisabilityExpense === 0 ? (
            <li>
              Death or permanent disability compensate:{" "}
              <span className="insurance-detail">
                Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </span>{" "}
            </li>
          ) : (
            props.insurance.deathOrPermanentDisabilityExpense && (
              <li>
                Death or permanent disability compensate:{" "}
                <span className="insurance-detail">
                  {props.insurance.deathOrPermanentDisabilityExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </span>{" "}
              </li>
            )
          )}
          {props.insurance.healthCheckOrVaccineExpense === 0 ? (
            <li>
              Health checking or vaccine expense:{" "}
              <span className="insurance-detail">
                Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </span>{" "}
            </li>
          ) : (
            props.insurance.healthCheckOrVaccineExpense && (
              <li>
                Health checking or vaccine expense:{" "}
                <span className="insurance-detail">
                  {props.insurance.healthCheckOrVaccineExpense.toLocaleString(
                    "en-US"
                  )}{" "}
                  THB
                </span>{" "}
              </li>
            )
          )}
          {props.insurance.dentistExpense === 0 ? (
            <li>
              Dentist expense:{" "}
              <span className="insurance-detail">
                Actual pay, not exceed{" "}
                {props.insurance.maxMedExpensePerTime.toLocaleString("en-US")}{" "}
                THB
              </span>{" "}
            </li>
          ) : (
            props.insurance.dentistExpense && (
              <li>
                Dentist expense:{" "}
                <span className="insurance-detail">
                  {props.insurance.dentistExpense.toLocaleString("en-US")} THB
                </span>{" "}
              </li>
            )
          )}
        </ol>
      </ul>
    </>
  );
};

export default InsuranceDetails;
