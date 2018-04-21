// Type definitions for winston 3.0
// Project: https://github.com/winstonjs/winston

/// <reference types="node" />

import {Format, FormatWrap} from 'logform';
import * as logform from 'logform';
import * as Config from './lib/winston/config/index';
import * as Transports from './lib/winston/transports/index';
import * as Transport from 'winston-transport';
import * as stream from "stream";

declare namespace winston {
    export import format = logform.format;
    export import config = Config;
    export import transports = Transports;

    // MAIN

    interface ExceptionHandler {
        logger: Logger;
        handlers: Map<any, any>;
        catcher: Function | boolean;

        handle(): void;
        unhandle(): void;
        getAllInfo(err: string | Error): object;
        getProcessInfo(): object;
        getOsInfo(): object;
        getTrace(err: Error): object;

        new(logger: Logger): ExceptionHandler;
    }

    interface QueryOptions {
        rows?: number;
        limit?: number;
        start?: number;
        from?: Date;
        until?: Date;
        order?: "asc" | "desc";
        fields: any;
    }

    interface Profiler {
        logger: Logger;
        start: Date;
        done(): boolean;
    }

    type LogCallback = (error?: any, level?: string, msg?: string, meta?: any) => void;

    interface LogEntry {
        level: string;
        msg: string;
        [optionName: string]: any;
    }

    interface LogMethod {
        (level: string, msg: string, callback: LogCallback): Logger;
        (level: string, msg: string, meta: any, callback: LogCallback): Logger;
        (level: string, msg: string, ...meta: any[]): Logger;
        (entry: LogEntry): Logger;
    }

    interface LeveledLogMethod {
        (msg: string, callback: LogCallback): Logger;
        (msg: string, meta: any, callback: LogCallback): Logger;
        (msg: string, ...meta: any[]): Logger;
    }

    interface LoggerOptions {
        levels?: Config.AbstractConfigSetLevels;
        silent?: string;
        format?: Format;
        level?: string;
        exitOnError?: Function | boolean;
        transports?: Transport[] | Transport;
        exceptionHandlers?: any;
    }

    interface Logger extends stream.Transform {
        silent: boolean;
        format: Format;
        levels: Config.AbstractConfigSetLevels;
        level: string;
        transports: Transport[];
        paddings: string[];
        exceptions: ExceptionHandler;
        profilers: object;
        exitOnError: Function | boolean;

        log: LogMethod;
        add(transport: Transport): Logger;
        remove(transport: Transport): Logger;
        clear(): Logger;
        close(): Logger;

        // for cli levels
        error: LeveledLogMethod;
        warn: LeveledLogMethod;
        help: LeveledLogMethod;
        data: LeveledLogMethod;
        info: LeveledLogMethod;
        debug: LeveledLogMethod;
        prompt: LeveledLogMethod;
        verbose: LeveledLogMethod;
        input: LeveledLogMethod;
        silly: LeveledLogMethod;

        // for syslog levels only
        emerg: LeveledLogMethod;
        alert: LeveledLogMethod;
        crit: LeveledLogMethod;
        warning: LeveledLogMethod;
        notice: LeveledLogMethod;

        query(options?: QueryOptions, callback?: (err: Error, results: any) => void): any;
        stream(options?: any): NodeJS.ReadableStream;

        startTimer(): Profiler;
        profile(id: string | number): Logger;

        configure(options: LoggerOptions): void;

        new(options?: LoggerOptions): Logger;
    }

    interface Container {
        loggers: object;
        options: object;
    }

    let version: string;
    // let transports: Transports;
    // let config: Config;
    // Transport: Transport;
    let ExceptionHandler: ExceptionHandler;
    let Container: Container;
    let loggers: Container;

    let addColors: (target: Config.AbstractConfigSetColors) => any;
    let createLogger: (options?: LoggerOptions) => Logger;

    // Pass through the target methods to the default logger.
    let log: LogMethod;
    let query: (options?: QueryOptions, callback?: (err: Error, results: any) => void) => any;
    let stream: (options?: any) => NodeJS.ReadableStream;
    let add: (transport: Transport) => Logger;
    let remove: (transport: Transport) => Logger;
    let clear: () => Logger;
    let startTimer: () => Profiler;
    let profile: (id: string | number) => Logger;
    let configure: (options: LoggerOptions) => void;
    let level: string;
    let exceptions: ExceptionHandler;
    let paddings: string[];
    let exitOnError: Function | boolean;
    // let default: object;
}

export = winston;