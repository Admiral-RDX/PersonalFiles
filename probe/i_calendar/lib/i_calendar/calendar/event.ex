defmodule ICalendar.Calendar.Event do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "events" do
    field :name, :string
    field :metadata, :string
    field :event_date, :date
    field :duration, :integer

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:event_date, :duration, :metadata, :name])
    |> validate_required([:event_date, :duration, :metadata, :name])
  end
end
