export const resolveTipoUsuario = (id: '1' | '2' | '3' | '4') => {
    const options = {
        '1': 'Administrador',
        '2': 'Coordenador',
        '3': 'Mobilizador',
        '4': 'Eleitor',
    }
    return options[id];
}