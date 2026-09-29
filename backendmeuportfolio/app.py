import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template, session, redirect
from flask_cors import CORS
import mysql.connector

load_dotenv()

app = Flask(__name__)

CORS(app)

app.secret_key = "chave-secreta-do-projeto"

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}


def criar_banco():
    conexao = mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        use_pure=True
    )

    cursor = conexao.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contatos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            contato VARCHAR(255) NOT NULL,
            mensagem TEXT NOT NULL
        )
    """)

    conexao.commit()

    cursor.close()
    conexao.close()


@app.route("/")
def inicio():
    return "Backend funcionando!"


@app.route("/contato", methods=["POST"])
def contato():
    dados = request.json

    contato = dados.get("contato")
    mensagem = dados.get("mensagem")

    conexao = mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        use_pure=True
    )

    cursor = conexao.cursor()

    cursor.execute(
        "INSERT INTO contatos (contato, mensagem) VALUES (%s, %s)",
        (contato, mensagem)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    print("Contato recebido:", contato)
    print("Mensagem recebida:", mensagem)

    return jsonify({
        "mensagem": "Proposta recebida e salva com sucesso!"
    })


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form.get("usuario")
        senha = request.form.get("senha")

        if usuario == "lays" and senha == "1234":
            session["logado"] = True
            return redirect("/admin")

        return "Usuario ou senha incorretos."

    return render_template("login.html")


@app.route("/admin")
def admin():
    if not session.get("logado"):
        return redirect("/login")

    conexao = mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        use_pure=True
    )

    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM contatos")

    contatos = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template(
        "contatos.html",
        contatos=contatos
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")


if __name__ == "__main__":
    criar_banco()
    app.run(debug=True)