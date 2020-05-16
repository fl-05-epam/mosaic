# mosaic

1. Создаете локальную копию проекта 

    `git clone <ссылка на GitHub вашего форка>` или клон с fl-05-epam  

2. Настройка upstream ветки

    `git remote add origin <ccылка на Ваш форк>`
    
    `git remote add upstream https://github.com/fl-05-epam/animation.git`
    
3. Алгоритм работы: 
    `git checkout develop` - переключаемс на девелоп
    
    `git checkout -b feature/<название-ветки>` - создаем ветку для фичи и работаем в ней

4. Алгоритм комита: 

    `git pull upstream develop` - стягивает изменения с основной ветки
    
    `git status` - проверить, какие файлы Вы изменяли
    
    `git add <файл или . (добавить все)>` - добавляет все измененные файлы. 

    `git commit -am "описание того, что вы сделали"` - сохраняем изменения на ветке

    `git push origin feature/<название вашей ветки>` - отправляем изменения себе в форк

    Создать pull request в удаленном репо.

