defmodule ICalendarWeb.CalendarHTML do
  @moduledoc """
  This module contains pages rendered by PageController.

  See the `page_html` directory for all templates available.
  """
  use ICalendarWeb, :html

  embed_templates "calendar_html/*"
end
