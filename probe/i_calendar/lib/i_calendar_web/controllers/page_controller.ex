defmodule ICalendarWeb.PageController do
  use ICalendarWeb, :controller

  def home(conn, _params) do
    render(conn, :home, layout: false)
  end
end
