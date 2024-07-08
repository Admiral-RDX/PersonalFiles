defmodule ICalendar.Repo do
  use Ecto.Repo,
    otp_app: :i_calendar,
    adapter: Ecto.Adapters.Postgres
end
