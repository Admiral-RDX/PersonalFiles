defmodule ICalendarWeb.UserLoginLive do
  use ICalendarWeb, :live_view

  def render(assigns) do
    ~H"""
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <.simple_form
              for={@form}
              id="login_form"
              class="space-y-4 md:space-y-6"
              action={~p"/users/log_in"}
              phx-update="ignore"
            >
              <.input class="" field={@form[:email]} type="email" label="Email" required />
              <.input field={@form[:password]} type="password" label="Password" required />
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <.input field={@form[:remember_me]} type="checkbox" label="Keep me logged in" />
                </div>
                <%!-- <.link
                  href={~p"/users/reset_password"}
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </.link> --%>
              </div>

              <.button
                phx-disable-with="Logging in..."
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Log in
              </.button>

              <%!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <.link
                  navigate={~p"/users/register"}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </.link>
              </p> --%>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                <.link
                  navigate={~p"/calendar"}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Calendar
                </.link>
              </p>
            </.simple_form>
          </div>
        </div>
      </div>
    </section>
    """
  end

  def mount(_params, _session, socket) do
    email = Phoenix.Flash.get(socket.assigns.flash, :email)
    form = to_form(%{"email" => email}, as: "user")
    {:ok, assign(socket, form: form), temporary_assigns: [form: form]}
  end
end
