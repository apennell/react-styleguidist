/**
 * This is a select menu of theme options; it should get `themes` from user config (todo) and get
 * context from styleGuideContext
 *
 * TODO:
 * - Figure out how to make setTheme work with useStyleGuideContext
 * - Separate renderer and functional file
 * - Resolve typings issues
 * - Update styles, using theme (those used here are copied from Input style on TOC)
 *
 * Big Todo:
 * - Figure out what to do with theme string...
 * Previously added a "ThemedWrapper" that added the Provider (ThemeProvider) wrapper around every
 * example component and that's where the context `theme` was used; should the config accept the
 * actual themes, or expect users to do the same?
 */

import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';
import * as Rsg from '../../../typings';

const styles = ({ space, color, fontFamily, fontSize }: Rsg.Theme) => ({
	root: {
		// styles in `root` match cui
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	select: {
		display: 'block',
		width: '100%',
		padding: space[1],
		color: color.base,
		backgroundColor: color.baseBackground,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		transition: 'all ease-in-out .1s',
		'&:focus': {
			isolate: false,
			borderColor: color.link,
			boxShadow: [[0, 0, 0, 2, color.focus]],
			outline: 0,
		},
		'&::placeholder': {
			isolate: false,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			color: color.light,
		},
	},
});

interface ThemeSelectRendererProps extends JssInjectedProps {
	// FIXME? made a guess on this...
	themes: string[];
}

export const ThemeSelectRenderer: React.FunctionComponent<ThemeSelectRendererProps> = ({
	classes,
	themes,
}) => {
	// TODO: figure out how to get setTheme working to update context.theme; theme should be an array of theme strings, as defined by a user in config
	const { theme, setTheme } = useStyleGuideContext();
	const onThemeChange = (event) => setTheme(event.target.value);
	return (
		<label htmlFor="themeSelect" className={classes.root}>
			Theme
			<select
				id="themeSelect"
				value={theme}
				onBlur={onThemeChange}
				onChange={onThemeChange}
				className={classes.select}
			>
				{themes.map((t: string) => (
					<option key={t} value={t}>
						{t}
					</option>
				))}
			</select>
		</label>
	);
};

ThemeSelectRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	themes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Styled<ThemeSelectRendererProps>(styles)(ThemeSelectRenderer);
