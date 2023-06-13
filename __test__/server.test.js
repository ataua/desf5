const supertest = require('supertest')

const req = supertest('http://0.0.0.0:3001')

beforeAll(async () => {
  await req.get('/db/pg').auth('admin', 'desafio-igti-nodejs')
})

afterAll(async () => {
  await req.get('/db/pg').auth('admin', 'desafio-igti-nodejs')
})

describe('Teste de acesso', () => {
  test('Acessar rota com usuário correto e senha incorreta', async () => {
    const result = await req.get('/cliente').auth('admin', 'admin')
    expect(result.status).toBe(401)
  })

  test('Acessar rota sem usuário e senha', async () => {
    const result = await req.get('/cliente')
    expect(result.status).toBe(401)
  })

  test('Acessar rota protegida com outro usuário autenticado, sem autorização', async () => {
    const result = await req.get('/cliente').auth('john', 'doe')
    expect(result.status).toBe(403)
  })
})

describe('Teste da rota: cliente', () => {
  const cliente1 = {
    nome: 'maria1',
    email: 'maria123@gmail.com',
    senha: '010101',
    telefone: '41-222222',
    endereco: 'Rua 1, casa 2'
  }

  const cliente2 = {
    cliente_id: 2,
    nome: 'Gael Geraldo da Conceição',
    email: 'ggconceicao@gmail.com',
    telefone: '69994235684',
    endereco: 'Rua Modigliani 148, Porto Velho-RO'
  }

  test('Lista clientes', async () => {
    const result = await req.get('/cliente').auth('admin', 'desafio-igti-nodejs')
    expect(result.status).toBe(200)
    expect(result.body.length).toBeGreaterThanOrEqual(5)
  })

  test('Cria cliente corretamente', async () => {
    await req.get('/pg')
    const result = await req.post('/cliente').send(cliente1).auth('admin', 'desafio-igti-nodejs')
    expect(result.status).toBe(201)
    expect(result.body.nome).toBe(cliente1.nome)
  })

  test('Retorna erro ao criar cliente com e-mail repetido', async () => {
    const result = await req.post('/cliente').send(cliente1).auth('admin', 'desafio-igti-nodejs')
    expect(result.status).toBe(400)
    expect(result.body.msg).toBe('E-mail já cadastrado')
  })

  test('Recupera dados de um cliente', async () => {
    const result = await req.get('/cliente/2').auth('admin', 'desafio-igti-nodejs')
    expect(result.status).toBe(200)
    expect(result.body).toEqual(cliente2)
  })
})
