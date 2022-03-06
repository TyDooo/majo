import './lib/setup';
import { MajoClient } from './lib/Majo';
import { container } from '@sapphire/framework';

const client = new MajoClient();

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main().catch(container.logger.error.bind(container.logger));
