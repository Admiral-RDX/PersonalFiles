defmodule ICalendarWeb.CalendarLive do
  use ICalendarWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <h1>Calendar</h1>
    <p>Here is your calendar!</p>
    """
  end
end
