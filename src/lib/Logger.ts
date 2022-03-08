import 'winston-daily-rotate-file';
import path from 'path';
import * as winston from 'winston';
import { ILogger, LogLevel } from '@sapphire/framework';

export class Logger implements ILogger {
	public readonly level: LogLevel;
	private readonly logger: winston.Logger;

	public constructor(level: LogLevel) {
		this.level = level;
		this.logger = this.createLogger();
		this.logger.verbose('Logger initialized');
	}

	public has(level: LogLevel): boolean {
		return level >= this.level;
	}

	public debug(...values: readonly unknown[]): void {
		this.write(LogLevel.Debug, ...values);
	}

	public error(...values: readonly unknown[]): void {
		this.write(LogLevel.Error, ...values);
	}

	public fatal(...values: readonly unknown[]): void {
		this.write(LogLevel.Fatal, ...values);
	}

	public info(...values: readonly unknown[]): void {
		this.write(LogLevel.Info, ...values);
	}

	public trace(...values: readonly unknown[]): void {
		this.write(LogLevel.Trace, ...values);
	}

	public warn(...values: readonly unknown[]): void {
		this.write(LogLevel.Warn, ...values);
	}

	public write(level: LogLevel, ...values: readonly unknown[]): void {
		if (!this.has(level)) return;
		const method = Logger.levels.get(level);
		if (typeof method === 'string') this.logger[method](values.concat(''));
	}

	private get hformat(): winston.Logform.Format {
		return winston.format.printf(({ level, label, message, timestamp, ...metadata }) => {
			let msg = `${timestamp} [${level}]${label ? `[${label}]` : ''}: ${message} `;
			if (Object.keys(metadata).length > 0) {
				msg += JSON.stringify(metadata);
			}
			return msg;
		});
	}

	private createLogger(): winston.Logger {
		return winston.createLogger({
			level: Logger.levels.get(this.level) || 'debug',
			format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), this.hformat),
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(winston.format.colorize(), winston.format.splat(), winston.format.timestamp(), this.hformat)
				}),
				new winston.transports.DailyRotateFile({
					filename: process.env.CONFIG_DIRECTORY
						? `${process.env.CONFIG_DIRECTORY}/logs/majo-%DATE%.log`
						: path.join(process.cwd(), '/config/logs/majo-%DATE%.log'),
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '20m',
					maxFiles: '7d',
					createSymlink: true,
					symlinkName: 'majo.log'
				})
			]
		});
	}

	protected static readonly levels = new Map<LogLevel, LogMethods>([
		[LogLevel.Trace, 'verbose'],
		[LogLevel.Debug, 'debug'],
		[LogLevel.Info, 'info'],
		[LogLevel.Warn, 'warn'],
		[LogLevel.Error, 'error'],
		[LogLevel.Fatal, 'error']
	]);
}

export type LogMethods = 'verbose' | 'debug' | 'info' | 'warn' | 'error';
