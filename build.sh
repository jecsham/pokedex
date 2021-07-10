# frontend
cd frontend
yarn install
yarn build

# copy frontend build to backend
cd ../
recursive-copy frontend/build/ backend/build/  

# backned
cd backend
yarn install
yarn build