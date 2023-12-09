# App

Gympass style app.

## RF (Requisitos Funcionais)

- [x] Deve ser possível realizar o cadastro.
- [x] Deve ser possível realizar autenticação no sistema.
- [ ] Deve ser possível obter o perfil de um usuário logado.
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [ ] Deve ser possível o usuário obter seu histório de check-ins.
- [ ] Deve ser possível o usuário buscar academias próximas.
- [ ] Deve ser possível o usuário procurar academias pelo nome.
- [ ] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [ ] Deve ser possível cadastrar uma academia.

## RN (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um e-mail que já está sendo utilizado.
- [ ] O usuário não pode fazer mais de 1 check-in no dia.
- [ ] O usuário não pode fazer check-in se não estiver próximo da academia. Até 100m.
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

## RNF (Requisitos Não Funcionais)

- [x] A senha do usuário precisa ser criptografada.
- [ ] Os dados da aplicação devem ser salvos em um banco de dados PostgreSQL.
- [ ] Todas as listas de dados deverão estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
