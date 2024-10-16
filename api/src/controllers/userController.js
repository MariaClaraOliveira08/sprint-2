const connect = require("../db/connect");

module.exports = class usuarioController {
  static async createUsuario(req, res) {
    const usuario = { nif, email, senha, nome_usuario } = req.body;
  
    if (!nif || !email || !senha || !nome_usuario) {

      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(nif) || nif.length !== 7) {
      return res.status(400).json({error: "nif inválido. Deve conter exatamente 7 dígitos numéricos"});
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (nif, email, senha, nome_usuario) VALUES('${nif}','${email}','${senha}','${nome_usuario}')`;

      // Executando a query criada

      try {
        connect.query(query, function (err, results) {
          if (err) {
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({ error: "O NIF já está vinculado a outro usuário" });
            } // if
            else {
              return res.status(500).json({ error: "Erro Interno do Servidor" });
            } // else
          } // if
          else {
            return res.status(201).json({message: "Usuário Criado com Sucesso",});
          } // else
        }); // connect
      } catch (error) {
        res.status(500).json({ error: "Erro Interno de Servidor" });
      } // catch
    } // else
  } // createUsuarios

  static async loginUsuario(req, res) {
    const { senha, email } = req.body;

    if (!senha || !email) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else {
      const query = `SELECT * FROM usuario WHERE email = 'usuario'`;

      try {
        // Executando a query
        connect.query(query, function (err, results) {
          if (err) {
            return res.status(500).json({ error: "Erro Interno do Servidor" });
          }

          // Verifica se o usuário foi encontrado
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
          }

          const usuario = results[0];

          // Verifica se a senha está correta
          if (usuario.senha === senha) {
            return res.status(200).json({message: "Login realizado com sucesso",});
          } else {
            return res.status(401).json({ error: "Senha incorreta" });
          }
        });
      } catch (error) {
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      } // catch
    } // else
  } // loginUsuario

  static async getAllUsuario(req, res) {
    return res.status(200).json({ message: "Obtendo todos os usuários"});
  }

  static async updateUsuario(req, res) {
    // desestrutura e recupera os dados enviados via corpo da requisição
    const { NIF, email, senha, nome_usuario } = req.body;
    if (!NIF || !email || !senha || !nome_usuario) {
      // valida se todos os campos foram preenchidos
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    // procura indice do user no array 'usuarios' pelo NIF
    const usuarioId = req.params.id_usuario;
    const usuarioIndex = usuario.findIndex((usuario) => usuario.id_usuario == usuarioId);
    // se não for encontrado o 'userindex' equivale a -1
    if (usuarioIndex == -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    // atualiza os dados do usuario na array 'usuarios'
    usuarios[usuarioIndex] = { NIF, email, senha, nome_usuario };
    return res.status(200).json({ message: "Usuário atualizado",usuario});
  }


  static async deleteUsuario(req, res) {
    const usuarioId = req.params.id_usuario;
    const usuarioIndex = usuario.findIndex((usuario) => usuario.id_usuario == usuarioId);

    // se não for encontrado o 'usuarioIndex' equivale a -1
    if (usuarioIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });

    }

    // removendo usuário da array 'usuarios'
    usuarios.splice(usuarioIndex, 1); // começa no indice 'usuarioIndex', e apaga somente '1'
    return res.status(200).json({ message: "Usuário apagado", usuario });
  }
};