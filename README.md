# App

Gympass style app.

## RF (Requisitos Funcionais)

- [x] Deve ser possível realizar o cadastro.
- [x] Deve ser possível realizar autenticação no sistema.
- [x] Deve ser possível obter o perfil de um usuário logado.
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [x] Deve ser possível o usuário obter seu histório de check-ins.
- [x] Deve ser possível o usuário buscar academias próximas (até 10KM).
- [x] Deve ser possível o usuário procurar academias pelo nome.
- [x] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [x] Deve ser possível cadastrar uma academia.

## RN (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um e-mail que já está sendo utilizado.
- [x] O usuário não pode fazer mais de 1 check-in no dia.
- [x] O usuário não pode fazer check-in se não estiver próximo da academia. Até 100m.
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

## RNF (Requisitos Não Funcionais)

- [x] A senha do usuário precisa ser criptografada.
- [x] Os dados da aplicação devem ser salvos em um banco de dados PostgreSQL.
- [x] Todas as listas de dados deverão estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
