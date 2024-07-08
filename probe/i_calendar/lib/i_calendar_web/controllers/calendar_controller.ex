defmodule ICalendarWeb.CalendarController do
  use ICalendarWeb, :controller

  def calendar(conn, _params) do
    render(conn, :calendar, layout: false)
  end
end
