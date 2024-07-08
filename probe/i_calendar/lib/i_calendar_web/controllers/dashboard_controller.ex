defmodule ICalendarWeb.DashboardController do
  use ICalendarWeb, :controller
  alias ICalendar.Calendar

  def dashboard(conn, _params) do
    events = Calendar.list_events()
    render(conn, :dashboard, events: events, layout: false)
  end
end
