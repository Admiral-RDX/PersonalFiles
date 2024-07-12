defmodule ICalendar.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :event_date, :date
      add :duration, :integer
      add :metadata, :string
      add :name, :string

      timestamps(type: :utc_datetime)
    end
  end
end
