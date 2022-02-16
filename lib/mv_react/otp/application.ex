defmodule MVReact.Otp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  require Logger

	import DynHacks

  @port 8524

  @impl true
  def start(_type, _args) do
    children = [
      {Plug.Cowboy, scheme: :http, plug: MVReactRouter, port: @port}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: MVReact.Supervisor]

    imp(
      Supervisor.start_link(children, opts),
      fn x ->
        Logger.info("Starting MVReact on port #{inspect(@port)}: #{inspect(x)}")
      end
    )
  end
end

