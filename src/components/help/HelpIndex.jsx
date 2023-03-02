/*!
 * Years of Service CalculatorSelector (React)
 * File: ServiceCalculatorHelp.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import "@/styles/ServiceCalculator.css";

/**
 * Help tooltip content
 * @returns
 */

export default {
  serviceCalculator: {
    title: 'How to use the years of service calculator',
    content: <>
      <p>You only need to input years.</p>
      <p>
        Enter your start year and your end year to check eligibility. Since
        service is cumulative, you can add additional rows to account for any
        breaks in service. Enter each group of continuous years on separate
        lines.
      </p>
      <p>For example:</p>
      <ul>
        <li>
          If you have been working with no breaks in service since 2008, enter
          “2008” as your start year and the current calendar year as your end
          year.
        </li>
        <li>
          If you worked from 2008 to 2010, had a two year break in service and
          then resumed service in 2012, enter “2008” as the start year and
          “2010” as the end year. Then add another row and enter “2012” as the
          start year and current calendar year as the end year.
        </li>
      </ul>
      <p>
        Note: If an end year is not set, the calculator will use the start
        year as the end year. If the start year is later than the end year,
        the row will be calculated as 0 years.
      </p>
    </>
  }
}
