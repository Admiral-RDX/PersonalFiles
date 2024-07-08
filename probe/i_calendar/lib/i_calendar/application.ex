defmodule ICalendar.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ICalendarWeb.Telemetry,
      ICalendar.Repo,
      {DNSCluster, query: Application.get_env(:i_calendar, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ICalendar.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: ICalendar.Finch},
      # Start a worker by calling: ICalendar.Worker.start_link(arg)
      # {ICalendar.Worker, arg},
      # Start to serve requests, typically the last entry
      ICalendarWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ICalendar.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ICalendarWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
