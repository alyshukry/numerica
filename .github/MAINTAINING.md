# Releasing a version
1. Push all changes to the version branch you are working on.
2. Merge the version branch you are working on into main.
3. Run these scripts:
    1. `npm run build`
    2. `npm run release:<version type>`
    3. `npm run publish:all`