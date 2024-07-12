defmodule ICalendar.CalendarFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ICalendar.Calendar` context.
  """

  @doc """
  Generate a event.
  """
  def event_fixture(attrs \\ %{}) do
    {:ok, event} =
      attrs
      |> Enum.into(%{
        duration: 42,
        event_date: ~D[2024-07-11],
        metadata: "some metadata",
        name: "some name"
      })
      |> ICalendar.Calendar.create_event()

    event
  end
end
