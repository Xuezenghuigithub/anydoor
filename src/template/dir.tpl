<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,minimal-ui:ios">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        body {
            margin: 30px;
        }
        a {
            display: block;
            font-family: 'Times New Roman', Times, serif;
            font-size: 30px;
        }
    </style>
</head>

<body>
    {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
    {{/each}}
</body>

</html>