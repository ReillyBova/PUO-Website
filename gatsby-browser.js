require('./src/styles/styles.css');

exports.onClientEntry = () => {
    // Load Roboto font to support Material Design
    const pathRoboto = 'https://fonts.googleapis.com/css?family=Roboto:500';
    const linkRoboto = document.createElement('link');
    linkRoboto.setAttribute('rel', 'stylesheet');
    linkRoboto.setAttribute('href', pathRoboto);
    document.head.appendChild(linkRoboto);

    // Load Open Sans font to support Material Design
    const pathOpenSans =
        'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700';
    const linkOpenSans = document.createElement('link');
    linkOpenSans.setAttribute('rel', 'stylesheet');
    linkOpenSans.setAttribute('href', pathOpenSans);
    document.head.appendChild(linkOpenSans);

    // Load Lora font to support custom features
    const pathLora = 'https://fonts.googleapis.com/css?family=Lora:700i';
    const linkLora = document.createElement('link');
    linkLora.setAttribute('rel', 'stylesheet');
    linkLora.setAttribute('href', pathLora);
    document.head.appendChild(linkLora);

    // Load Material Icons
    const pathIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    const linkIcons = document.createElement('link');
    linkIcons.setAttribute('rel', 'stylesheet');
    linkIcons.setAttribute('href', pathIcons);
    document.head.appendChild(linkIcons);
};
