defmodule ICalendarWeb.DashboardLive do
  use ICalendarWeb, :live_view

  alias ICalendar.Calendar.Event
  alias ICalendar.Repo
  import Ecto.Query

  def mount(_params, _session, socket) do
    events = filter_and_sort_events("", :event_date, :asc)

    {:ok,
     assign(socket,
       events: events,
       filter: "",
       show_modal: false,
       selected_event: %Event{},
       is_new_event: false,
       sort_by: :event_date,
       sort_order: :asc
     )}
  end

  def handle_event("filter", %{"filter" => filter}, socket) do
    sorted_events =
      filter_and_sort_events(filter, socket.assigns.sort_by, socket.assigns.sort_order)

    {:noreply, assign(socket, events: sorted_events, filter: filter)}
  end

  def handle_event("add_event", _params, socket) do
    {:noreply, assign(socket, show_modal: true, selected_event: %Event{}, is_new_event: true)}
  end

  def handle_event("edit_event", %{"id" => id}, socket) do
    event = Repo.get!(Event, id)
    {:noreply, assign(socket, show_modal: true, selected_event: event, is_new_event: false)}
  end

  def handle_event("close_modal", _params, socket) do
    {:noreply, assign(socket, show_modal: false, selected_event: %Event{}, is_new_event: false)}
  end

  def handle_event(
        "save_event",
        %{
          "event_id" => id,
          "event_name" => name,
          "event_date" => date,
          "duration" => duration,
          "metadata" => metadata
        },
        socket
      ) do
    event =
      if socket.assigns.is_new_event do
        %Event{}
      else
        Repo.get!(Event, id)
      end

    changeset =
      Event.changeset(event, %{
        name: name,
        event_date: Date.from_iso8601!(date),
        duration: String.to_integer(duration),
        metadata: metadata
      })

    case if socket.assigns.is_new_event, do: Repo.insert(changeset), else: Repo.update(changeset) do
      {:ok, _event} ->
        sorted_events =
          filter_and_sort_events(
            socket.assigns.filter,
            socket.assigns.sort_by,
            socket.assigns.sort_order
          )

        {:noreply,
         assign(socket,
           show_modal: false,
           events: sorted_events,
           selected_event: %Event{},
           is_new_event: false
         )}

      {:error, changeset} ->
        {:noreply,
         assign(socket, show_modal: true, selected_event: changeset.data, changeset: changeset)}
    end
  end

  def handle_event("sort", %{"field" => field}, socket) do
    sort_order =
      if socket.assigns.sort_by == String.to_existing_atom(field) do
        if socket.assigns.sort_order == :asc, do: :desc, else: :asc
      else
        :asc
      end

    sorted_events =
      filter_and_sort_events(socket.assigns.filter, String.to_existing_atom(field), sort_order)

    {:noreply,
     assign(socket,
       events: sorted_events,
       sort_by: String.to_existing_atom(field),
       sort_order: sort_order
     )}
  end

  def handle_event("delete_event", %{"id" => id}, socket) do
    event = Repo.get!(Event, id)

    case Repo.delete(event) do
      {:ok, _event} ->
        sorted_events =
          filter_and_sort_events(
            socket.assigns.filter,
            socket.assigns.sort_by,
            socket.assigns.sort_order
          )

        {:noreply,
         assign(socket,
           show_modal: false,
           events: sorted_events,
           selected_event: %Event{},
           is_new_event: false
         )}

      {:error, _changeset} ->
        {:noreply, assign(socket, show_modal: true, selected_event: event)}
    end
  end

  defp filter_and_sort_events(filter, sort_by, sort_order) do
    from(e in Event,
      where: ilike(e.name, ^"%#{filter}%"),
      order_by: [{^sort_order, field(e, ^sort_by)}]
    )
    |> Repo.all()
  end

  def render(assigns) do
    ~H"""
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
      Search
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
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

      <form phx-submit="filter" phx-change="filter" class="flex items-center gap-3">
        <input
          type="text"
          name="filter"
          value={@filter}
          phx-debounce="800"
          placeholder="Search Mockups, Logos..."
          class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          phx-click="add_event"
          class="text-white h-[45px] bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </form>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 cursor-pointer"
              phx-click="sort"
              phx-value-field="event_date"
            >
              <div class="flex items-center gap-2">
                Date
                <a href="#">
                  <svg
                    class="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 cursor-pointer"
              phx-click="sort"
              phx-value-field="duration"
            >
              <div class="flex items-center gap-2">
                Duration
                <a href="#">
                  <svg
                    class="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Type
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <%= for event <- @events do %>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
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
                <a
                  href="#"
                  phx-click="edit_event"
                  phx-value-id={event.id}
                  class="font-medium text-blue-400 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          <% end %>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div class={"fixed z-10 inset-0 overflow-y-auto #{if @show_modal, do: "", else: "hidden"}"}>
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 dark:bg-slate-900 opacity-75"></div>
        </div>

        <div class="inline-block rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div class="bg-white rounded-lg shadow dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                <%= if @is_new_event, do: "Add Event", else: "Edit Event" %>
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                phx-click="close_modal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  >
                  </path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="mt-2">
              <form phx-submit="save_event">
                <input
                  type="hidden"
                  name="event_id"
                  value={(@selected_event && @selected_event.id) || ""}
                />
                <div class="mb-4">
                  <label
                    for="event_name"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="event_name"
                    id="event_name"
                    value={(@selected_event && @selected_event.name) || ""}
                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="event_date"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    id="event_date"
                    value={(@selected_event && @selected_event.event_date) || ""}
                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="duration"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={(@selected_event && @selected_event.duration) || ""}
                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="metadata"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Metadata
                  </label>
                  <input
                    type="text"
                    name="metadata"
                    id="metadata"
                    value={(@selected_event && @selected_event.metadata) || ""}
                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="flex justify-between">
                  <.button phx-disable-with="Saving..." class="w-full me-2">
                    Save
                  </.button>
                  <%= if !@is_new_event do %>
                    <button
                      type="button"
                      phx-click="delete_event"
                      phx-value-id={@selected_event.id}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  <% end %>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
  end
end
