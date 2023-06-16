import classes from "./ResultsTable.module.css";
import { CSVLink } from 'react-csv';

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResultsTable = (props) => {
  // let outputData = `Year, Total Savings, Interest (Year), Total Interest, Invested Capital
  // ${props.data.map((yearData) => {
  //   return (`${yearData.year}, ${formatter.format(yearData.savingsEndOfYear)}, ${formatter.format(yearData.yearlyInterest)}, ${formatter.format(yearData.savingsEndOfYear - props.initialInvestment - yearData.yearlyContribution * yearData.year)}`
  //   )
  // })}`
  // const blob = new Blob([outputData], {type: "octet-stream"})
  // const href = URL.createObjectURL(blob)
  // URL.revokeObjectURL(href)

  const outputData = props.data.map((yearData) => {
    return {
      Year: yearData.year,
      "Total Savings": formatter.format(yearData.savingsEndOfYear),
      "Total Interest": formatter.format(yearData.yearlyInterest),
      "Invested Capital": formatter.format(
        yearData.savingsEndOfYear -
          props.initialInvestment -
          yearData.yearlyContribution * yearData.year
      )
    };
  });

  return (
    <div className="">
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
      <CSVLink data={outputData} filename={"myInvestment.csv"}>
        Download
      </CSVLink>
    </div>
  );
};

export default ResultsTable;
