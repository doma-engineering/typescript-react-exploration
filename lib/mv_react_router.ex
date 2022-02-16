defmodule MVReactRouter do
  use Plug.Router
  plug(:match)
  # plug(CORSPlug)
  plug(Plug.Logger, log: :debug)
  plug(Arclight.PlugReact, app: :m_v_react)
  plug(:dispatch)

  match _ do
    send_resp(
      conn,
      403,
      "Arox"
    )
  end

end
