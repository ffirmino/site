# Portfólio — Fabio Firmino · FSK IT

Site publicado em: https://ffirmino.github.io/site/

| Caminho | O que é |
|---|---|
| `/` (`index.html`) | Versão atual: sobre, projetos, experiência em resumo, stack, formação, contato |
| `/terminal.html` | Versão terminal estilo Matrix (`\help`, `\info`, `\projetos`, `\exp`, `\contato`, `\legado`, `\gui`…) |
| `/legado/` | Site antigo (2023), mantido para mostrar a evolução |

Tudo em HTML, CSS e JavaScript puros, sem build.

## Editar o conteúdo
Os textos, projetos e links ficam em **`js/data.js`** e as duas versões leem dele.
Para incluir um projeto, adicione um item no array `PROJECTS`.
A pasta `legado/` não deve ser alterada.

## Publicar (GitHub Pages)
```powershell
git add -A
git commit -m "descrição da mudança"
git push
```
O GitHub Pages publica a branch `master` em poucos minutos.
