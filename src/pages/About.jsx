import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎮 Sobre o GameLog</h1>

      <p>
        O <strong>GameLog</strong> é uma aplicação desenvolvida com o objetivo de ajudar jogadores a organizarem suas experiências com videogames de forma prática e intuitiva.
        Com ele, é possível criar uma lista personalizada de jogos, acompanhar o progresso, favoritar títulos marcantes e descobrir novas aventuras para explorar.
      </p><br/><br/>

      <p>
        A plataforma utiliza a <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">RAWG API</a> para fornecer dados atualizados sobre jogos,
        incluindo avaliações, plataformas, gêneros e imagens.
        Para tornar as informações mais acessíveis ao público brasileiro, também foi integrada uma funcionalidade de tradução automática das descrições para o português.
      </p><br/><br/>

      <p>
        Este projeto foi desenvolvido por <strong>Michael Aguiar</strong>, como parte de uma jornada de aprendizado em desenvolvimento frontend,
        com foco em React, manipulação de estado e integração com serviços externos.
        A proposta do GameLog nasceu da vontade de unir a paixão por programação com o universo dos games.
      </p><br/><br/>

      <p>
        Caso tenha sugestões, dúvidas ou queira compartilhar feedbacks, sinta-se à vontade para entrar em contato.
        Sua opinião é sempre bem-vinda!
      </p><br/>

      <p style={{ marginTop: '3rem', fontSize: '0.9rem', textAlign: 'center', opacity: 0.6 }}>
        © {new Date().getFullYear()} Michael Aguiar – Todos os direitos reservados.
      </p>
    </div>
  );
};

export default About;
