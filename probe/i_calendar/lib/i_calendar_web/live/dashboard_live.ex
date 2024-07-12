defmodule ICalendarWeb.DashboardLive do
  use ICalendarWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
    """
  end
end
