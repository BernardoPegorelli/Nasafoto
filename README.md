# NASA APOD Birthday Website

Este projeto permite que você descubra qual foi a Foto Astronômica do Dia (APOD) da NASA na data do seu aniversário (ou em qualquer outra data!).

O backend é construído em Python (Flask) e o frontend é uma interface moderna e responsiva servida pelo próprio backend.

## Pré-requisitos

- Python 3.x instalado.
- Chave de API da NASA (já configurada no seu `.env`).

## Configuração e Instalação

Siga os passos abaixo no seu terminal (PowerShell) para configurar o ambiente:

### 1. Liberar Execução de Scripts (Se necessário)
Caso receba um erro ao tentar ativar o ambiente virtual, execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### 2. Criar e Ativar o Ambiente Virtual
Navegue até a pasta `backend` e execute:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
```

### 3. Instalar Dependências
Com o ambiente virtual ativado, instale os pacotes necessários:
```powershell
pip install -r requirements.txt
```

## Como Rodar o Projeto

1. Certifique-se de que o ambiente virtual está ativado (`(venv)` deve aparecer no início da linha do terminal).
2. Na pasta `backend`, inicie o servidor Flask:
```powershell
python app.py
```
3. O servidor estará rodando em: **http://127.0.0.1:5000**
4. Abra este endereço no seu navegador favorito.

## Estrutura do Projeto

- `/backend`: Contém a lógica da API (Flask) e serve os arquivos estáticos.
- `/frontend`: Contém a interface do usuário (HTML, CSS, JS).
- `.env`: Arquivo de configuração com a sua NASA_API_KEY.
