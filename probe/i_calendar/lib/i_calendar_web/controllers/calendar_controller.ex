defmodule ICalendarWeb.CalendarController do
  use ICalendarWeb, :controller

  def calendar(conn, _params) do
    # Adjust year as necessary
    year = 2024
    current_date = Date.utc_today()

    months =
      Enum.map(1..12, fn month ->
        %{month: month, days: days_in_month(year, month)}
      end)

    render(conn, :calendar, layout: false, months: months, year: year, current_date: current_date)
  end

  defp days_in_month(year, month) do
    month_str = String.pad_leading(Integer.to_string(month), 2, "0")
    date_str = "#{year}-#{month_str}-01"
    {:ok, date} = Date.from_iso8601(date_str)
    days = Date.days_in_month(date)
    first_day = Date.beginning_of_month(date)
    %{days: days, first_day: Date.day_of_week(first_day)}
  end
end
