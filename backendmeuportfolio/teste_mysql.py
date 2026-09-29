import mysql.connector

print("TESTANDO MYSQL")

try:
    conexao = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="SUA_SENHA",
        database="meu_portfolio",
        connection_timeout=5
    )

    print("MYSQL CONECTADO")

    conexao.close()

except mysql.connector.Error as erro:
    print("ERRO MYSQL:")
    print(erro)

except Exception as erro:
    print("ERRO:")
    print(erro)

input("Pressione Enter para fechar...")