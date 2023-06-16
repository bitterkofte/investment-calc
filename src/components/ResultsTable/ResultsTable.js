import classes from "./ResultsTable.module.css";
import { CSVLink } from "react-csv";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResultsTable = (props) => {
  const outputData = props.data?.map((yearData) => {
    return {
      Year: yearData.year,
      "Total Savings": formatter.format(yearData.savingsEndOfYear),
      "Total Interest": formatter.format(yearData.yearlyInterest),
      "Invested Capital": formatter.format(
        yearData.savingsEndOfYear -
          props.initialInvestment -
          yearData.yearlyContribution * yearData.year
      ),
    };
  });

  return (
    <div className={classes["result-container"]}>
      <table className={classes.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((yearData) => (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.savingsEndOfYear)}</td>
              <td>{formatter.format(yearData.yearlyInterest)}</td>
              <td>
                {formatter.format(
                  yearData.savingsEndOfYear -
                    props.initialInvestment -
                    yearData.yearlyContribution * yearData.year
                )}
              </td>
              <td>
                {formatter.format(
                  props.initialInvestment +
                    yearData.yearlyContribution * yearData.year
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes["button-container"]}>
        <CSVLink
          className={classes.csv}
          data={outputData}
          filename={"MyInvestment.csv"}
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default ResultsTable;
