<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<form role="form" class="spammy-settings">
				<div class="mb-4">
					<h5 class="fw-bold tracking-tight settings-header">Spam Prevention Rules</h5>

					<p class="lead">
						Configure email patterns to block spam registrations.
					</p>

					<div class="alert alert-info">
						<h6>Pattern Types:</h6>
						<ul class="mb-0">
							<li><strong>Exact match:</strong> <code>spammer@example.com</code></li>
							<li><strong>Wildcard:</strong> <code>*@spam-domain.com</code></li>
							<li><strong>Regex:</strong> <code>/^[a-z]{4}[0-9]{4}@.*$/i</code></li>
						</ul>
					</div>

					<div class="mb-3">
						<label class="form-label" for="patterns">Email Patterns (one per line)</label>
						<textarea 
							id="patterns" 
							name="patterns" 
							data-field="patterns"
							class="form-control" 
							rows="10" 
							placeholder="*@spam-domain.com&#10;/^[a-z]{4}[0-9]{4}@.*$/i&#10;baduser@example.com"
						></textarea>
						<div class="form-text">
							Block emails matching these patterns.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="domains">Username=Email Domains (one per line)</label>
						<textarea 
							id="domains" 
							name="domains" 
							data-field="domains"
							class="form-control" 
							rows="5" 
							placeholder="gmail.com&#10;yahoo.com&#10;hotmail.com"
						></textarea>
						<div class="form-text">
							For these domains, block registrations where username matches email local-part (e.g., username "john123" with email "john123@gmail.com").
						</div>
					</div>
				</div>
			</form>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>
