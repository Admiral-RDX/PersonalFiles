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
            <.simple_form for={@form} id="login_form" action={~p"/users/log_in"} phx-update="ignore">
              <.input field={@form[:email]} type="email" label="Email" required />
              <.input field={@form[:password]} type="password" label="Password" required />

              <div class="flex items-center justify-between">
                <.input field={@form[:remember_me]} type="checkbox" label="Keep me logged in" />
                <.link
                  href={~p"/users/reset_password"}
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-slate-800 dark:text-white"
                >
                  Forgot your password?
                </.link>
              </div>
              <.button phx-disable-with="Logging in..." class="w-full">
                Log in <span aria-hidden="true">→</span>
              </.button>
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
