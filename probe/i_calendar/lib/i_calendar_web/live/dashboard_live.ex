defmodule ICalendarWeb.DashboardLive do
  use ICalendarWeb, :live_view

  alias ICalendar.Calendar.Event
  alias ICalendar.Repo
  import Ecto.Query

  def mount(_params, _session, socket) do
    events = Repo.all(Event)
    {:ok, assign(socket, events: events, filter: "")}
  end

  def handle_event("filter", %{"filter" => filter}, socket) do
    filtered_events = filter_events(filter)
    {:noreply, assign(socket, events: filtered_events, filter: filter)}
  end

  defp filter_events(filter) do
    from(e in Event, where: ilike(e.name, ^"%#{filter}%"))
    |> Repo.all()
  end

  def render(assigns) do
    ~H"""
    <div>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <form phx-submit="filter" phx-change="filter">
          <input
            type="text"
            name="filter"
            value={@filter}
            phx-debounce="400"
            placeholder="Search Mockups, Logos..."
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </form>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Duration
            </th>
            <th scope="col" class="px-6 py-3">
              Metadata
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <%= for event <- @events do %>
            <tr class="odd:bg-white even:bg-gray-50 border-b ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <%= event.name %>
              </th>
              <td class="px-6 py-4">
                <%= event.event_date %>
              </td>
              <td class="px-6 py-4">
                <%= event.duration %>
              </td>
              <td class="px-6 py-4">
                <%= event.metadata %>
              </td>
              <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
          <% end %>
        </tbody>
      </table>
    </div>
    """
  end
end
