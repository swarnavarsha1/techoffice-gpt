@echo off
echo Setting up PrivateGPT React Frontend...

REM Create the directory for React frontend
mkdir ..\private-gpt-ui
xcopy /E /I ./* ..\private-gpt-ui\

REM Navigate to the React project directory
cd ..\private-gpt-ui

REM Initialize npm and install dependencies
echo Installing dependencies...
call npm install

REM Create necessary directories for public assets
mkdir public\assets

REM Copy logo and avatar from the backend if needed
if exist ..\private-gpt\private_gpt\ui\avatar-bot.ico (
  copy ..\private-gpt\private_gpt\ui\avatar-bot.ico public\techoffice-logo.png
  copy ..\private-gpt\private_gpt\ui\avatar-bot.ico public\favicon.ico
)

echo Setup complete! You can now start the React frontend:
echo cd ..\private-gpt-ui
echo npm start